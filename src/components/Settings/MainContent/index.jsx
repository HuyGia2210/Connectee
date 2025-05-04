import React from 'react';
import AccountInfoTab from '../AccountInfoTab';
import UserInterface from '../UserInterface';
import ChangeInfomation from '../ChangeInfomation';
import LanguageSetting from '../LanguageSetting';

function MainContent({ activeTab, appUser, lang, scrMode, setLang, setScrMode}) {
  return (
    <div>
      {activeTab === 'accountInfo' && <AccountInfoTab appUser={appUser} scrMode={scrMode} lang={lang}/>}
      {activeTab === 'userInterface' && <UserInterface scrMode={scrMode} setScrMode={setScrMode} lang={lang}/>}
      {activeTab === 'changeInfomation' && <ChangeInfomation appUser={appUser} scrMode={scrMode} lang={lang}/>}
      {activeTab === 'language' && <LanguageSetting lang={lang} setLang={setLang} scrMode={scrMode}/>}
    </div>
  );
}

export default MainContent;