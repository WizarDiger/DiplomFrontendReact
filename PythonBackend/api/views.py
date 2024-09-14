import string

from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import MoodOfPhrase
from .serializers import MoodOfPhraseSerializer
import torch
from torch import nn
from d2l import torch as d2l
import pandas as pd
import numpy as np
import torch.onnx
import pymorphy2

def trainModel():
    batch_size = 64
    all_data = pd.read_excel('dataset4.xlsx')
    train_buff = all_data.iloc[:21000, :]
    test_buff = all_data.iloc[21000:, :]
    dataBuff = train_buff['Data'].values
    labelsBuff = train_buff['Label'].values
    dataBuffTest = test_buff['Data'].values
    labelsBuffTest = test_buff['Label'].values
    data, labels = [], []
    dataTest, labelsTest = [], []
    for phrase in dataBuff:
        data.append(phrase)
    for label in labelsBuff:
        labels.append(label)

    for phrase in dataBuffTest:
        dataTest.append(phrase)
    for label in labelsBuffTest:
        labelsTest.append(label)

    def tokenize(lines, token='word'):
        """Split text lines into word or character tokens.
        Defined in :numref:`sec_utils`"""
        assert token in ('word', 'char'), 'Unknown token type: ' + token
        return [line.split() if token == 'word' else list(line) for line in lines]

    train_data = data, labels
    test_data = dataTest, labelsTest
    ##for line in train_data[0]:
    ##    testline = line.split()
    ##    print(testline)
    train_tokens = tokenize(train_data[0], token='word')
    test_tokens = tokenize(test_data[0], token='word')
    vocab = d2l.Vocab(train_tokens, min_freq=5)

    train_features = torch.tensor([d2l.truncate_pad(
        vocab[line], 500, vocab['<pad>']) for line in train_tokens])

    test_features = torch.tensor([d2l.truncate_pad(
        vocab[line], 500, vocab['<pad>']) for line in test_tokens])

    train_iter = d2l.load_array((train_features, torch.tensor(train_data[1])),
                                batch_size)
    test_iter = d2l.load_array((test_features, torch.tensor(test_data[1])),
                               batch_size,
                               is_train=False)

    def corr1d(X, K):
        w = K.shape[0]
        Y = torch.zeros((X.shape[0] - w + 1))
        for i in range(Y.shape[0]):
            Y[i] = (X[i: i + w] * K).sum()
        return Y

    X, K = torch.tensor([0, 1, 2, 3, 4, 5, 6]), torch.tensor([1, 2])
    corr1d(X, K)

    def corr1d_multi_in(X, K):
        return sum(corr1d(x, k) for x, k in zip(X, K))

    X = torch.tensor([[0, 1, 2, 3, 4, 5, 6],
                      [1, 2, 3, 4, 5, 6, 7],
                      [2, 3, 4, 5, 6, 7, 8]])
    K = torch.tensor([[1, 2], [3, 4], [-1, -3]])
    corr1d_multi_in(X, K)

    class TextCNN(nn.Module):
        def __init__(self, vocab_size, embed_size, kernel_sizes, num_channels,
                     **kwargs):
            super(TextCNN, self).__init__(**kwargs)
            self.embedding = nn.Embedding(vocab_size, embed_size)
            self.constant_embedding = nn.Embedding(vocab_size, embed_size)
            self.dropout = nn.Dropout(0.5)
            self.decoder = nn.Linear(sum(num_channels), 2)
            self.pool = nn.AdaptiveAvgPool1d(1)
            self.relu = nn.ReLU()
            self.convs = nn.ModuleList()
            for c, k in zip(num_channels, kernel_sizes):
                self.convs.append(nn.Conv1d(2 * embed_size, c, k))

        def forward(self, inputs):
            embeddings = torch.cat((
                self.embedding(inputs), self.constant_embedding(inputs)), dim=2)
            embeddings = embeddings.permute(0, 2, 1)
            encoding = torch.cat([
                torch.squeeze(self.relu(self.pool(conv(embeddings))), dim=-1)
                for conv in self.convs], dim=1)
            outputs = self.decoder(self.dropout(encoding))
            return outputs

    embed_size, kernel_sizes, nums_channels = 100, [3, 4, 5], [100, 100, 100]
    devices = d2l.try_all_gpus()
    net = TextCNN(len(vocab), embed_size, kernel_sizes, nums_channels)

    def init_weights(module):
        if type(module) in (nn.Linear, nn.Conv1d):
            nn.init.xavier_uniform_(module.weight)

    net.apply(init_weights);

    glove_embedding = d2l.TokenEmbedding('glove.6b.100d')
    embeds = glove_embedding[vocab.idx_to_token]
    net.embedding.weight.data.copy_(embeds)
    net.constant_embedding.weight.data.copy_(embeds)
    net.constant_embedding.weight.requires_grad = False

    lr, num_epochs = 0.001, 5
    trainer = torch.optim.Adam(net.parameters(), lr=lr)
    loss = nn.CrossEntropyLoss(reduction="none")
    d2l.train_ch13(net, train_iter, test_iter, loss, trainer, num_epochs, devices)
    return net,vocab

net, vocab = trainModel()

def getPrediction(phrase):
    return d2l.predict_sentiment(net, vocab, phrase)

def pos(word, morth=pymorphy2.MorphAnalyzer()):
    "Return a likely part of speech for the *word*."""
    return morth.parse(word)[0].tag.POS

@api_view(['GET', 'POST'])
def getmood(request):
    if request.method == 'GET':
        mood = MoodOfPhrase(id=0, phrase="Этот фильм очень хороший FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF ")
        serializer = MoodOfPhraseSerializer(mood)
        return Response(serializer.data)
    if request.method == 'POST':
        myId = request.data.get('id')
        myPhrase = request.data.get('phrase')
        print(request.data)
        serializer = MoodOfPhraseSerializer(data=request.data)

        if serializer.is_valid():
            #print("kekcheck")

            morph = pymorphy2.MorphAnalyzer()
            myPhrase = myPhrase.translate(str.maketrans('', '', string.punctuation))
            words = morph.parse(myPhrase)[0].normal_form.split()
            functors_pos = {'ADJF','ADJS','COMP','VERB','INFN','PRTF','PRTS','GRND','NUMR','ADVB','NPRO','PRED','PREP','CONJ','PRCL','INTJ'}  # function words
            #(*[word for word in words if pos(word) not in functors_pos])
            normalized_words = [word for word in words if pos(word) not in functors_pos]
            print(normalized_words)
            prediction = getPrediction(myPhrase)
            print(prediction)
            #print("kekcheck2")
            result = normalized_words,prediction

            return Response(result, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
