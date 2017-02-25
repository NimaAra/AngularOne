namespace AngularOne.Host.Server.Models
{
    using System;

    public sealed class Company : IEquatable<Company>
    {
        public Company(string symbol, string name)
        {
            Symbol = symbol;
            Name = name;
        }

        public string Symbol { get; }
        public string Name { get; }

        #region Equality

        public bool Equals(Company other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;
            return string.Equals(Symbol, other.Symbol) && string.Equals(Name, other.Name);
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            var a = obj as Company;
            return a != null && Equals(a);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                return ((Symbol?.GetHashCode() ?? 0) * 397) ^ (Name?.GetHashCode() ?? 0);
            }
        }

        public static bool operator ==(Company left, Company right)
        {
            return Equals(left, right);
        }

        public static bool operator !=(Company left, Company right)
        {
            return !Equals(left, right);
        }

        #endregion
    }
}