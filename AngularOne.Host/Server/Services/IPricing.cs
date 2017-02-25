namespace AngularOne.Host.Server.Services
{
    using System;
    using AngularOne.Host.Server.Models;

    public interface IPricing
    {
        Company[] Companies { get; }
        event EventHandler<Price> OnNewPrice;
    }
}