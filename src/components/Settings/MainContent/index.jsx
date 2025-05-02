import React from 'react';
import AccountInfoTab from '../../../components/Settings/AccountInfoTab';
import SecurityTab from '../../../components/Settings/SecurityTab';
import NotificationsTab from '../../../components/Settings/NotificationsTab';
import ConnectedAppsTab from '../../../components/Settings/ConnectedAppsTab';

function MainContent({ activeTab }) {
  return (
    <div>
      {activeTab === 'accountInfo' && <AccountInfoTab />}
      {activeTab === 'security' && <SecurityTab />}
      {activeTab === 'notifications' && <NotificationsTab />}
      {activeTab === 'connectedApps' && <ConnectedAppsTab />}
    </div>
  );
}

export default MainContent;