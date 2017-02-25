namespace AngularOne.Host.Server.Models
{
    public sealed class Price
    {
        public Price(Company company, decimal value, decimal dayChangeValue, decimal dayChangePercent)
        {
            Company = company;
            Value = value;
            DayChangeValue = dayChangeValue;
            DayChangePercent = dayChangePercent;
        }

        public Company Company { get; }
        public decimal Value { get; }
        public decimal DayChangeValue { get; }
        public decimal DayChangePercent { get; }
    }
}