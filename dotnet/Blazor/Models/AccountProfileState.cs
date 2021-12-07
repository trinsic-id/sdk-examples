using System;
using Trinsic.Services.Account.V1;

namespace Blazor.Models
{
    public class AccountProfileState
    {
        private AccountProfile? currentProfile;

        public AccountProfile? CurrentProfile
        {
            get => currentProfile;
            set
            {
                currentProfile = value;
                NotifyStateChanged();
            }
        }

        public event Action? OnChange;

        private void NotifyStateChanged() => OnChange?.Invoke();
    }
}

