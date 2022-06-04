namespace DiplomBackendASPNet.Models
{
    public class FeedEntry
    {
        public int FeedId { get; set; }
        public string SenderId { get; set; }
        public string Title { get; set; }
        public string SenderName { get; set; }
        public string SendTime { get; set; }
        public string Description { get; set; }
        public string ImageName { get; set; }
        public int LikeCounter { get; set; }

    }
}
