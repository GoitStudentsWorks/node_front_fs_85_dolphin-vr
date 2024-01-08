//* Мій старий код з використання react-modal. Функціонал працює, але позиціонування ні.*//


// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import UserLogoutModal from '../UserLogoutModal/UserLogoutModal';
// import SettingModal from '../SettingModal/SettingModal'
// import { ModalStyled, Backdrop, ContainerULM, UserLogoModalBtn, UserLogoModalName } from './UserLogoModal.styled';
// import sprite from "../../images/sprite.svg";

// Modal.setAppElement('#root');

// const UserLogoModal = ({ onClose }) => {
//     const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
//     const [isUserLogoutModalOpen, setIsUserLogoutModalOpen] = useState(false);

//     const openUserInfoModal = () => {
//         setIsUserInfoModalOpen(true);
//         setIsUserLogoutModalOpen(false);
//     };

//     const openUserLogoutModal = () => {
//         setIsUserInfoModalOpen(false);
//         setIsUserLogoutModalOpen(true);
//     };

//     return (
//         <ModalStyled
//             isOpen={true}
//             onRequestClose={onClose}
//             contentLabel="User Modal"
//             overlayClassName="custom-overlay"
//         >
//             <Backdrop onClick={onClose}/>
//             <ContainerULM>
//                 <UserLogoModalBtn onClick={openUserInfoModal}>
//                     <svg width="16" height="16" stroke="#407BFF">
//                         <use href={sprite + "#settings"}></use>
//                     </svg>
//                     <UserLogoModalName>Setting</UserLogoModalName>
//                 </UserLogoModalBtn>
//                 <UserLogoModalBtn onClick={openUserLogoutModal}>
//                     <svg width="16" height="16" stroke="#407BFF">
//                         <use href={sprite + "#logout"}></use>
//                     </svg>
//                     <UserLogoModalName>Log out</UserLogoModalName>
//                 </UserLogoModalBtn>
//             </ContainerULM>
//         {isUserInfoModalOpen && <SettingModal onClose={() => setIsUserInfoModalOpen(false)} />}
//         {isUserLogoutModalOpen && <UserLogoutModal onClose={() => setIsUserLogoutModalOpen(false)} />}
//         </ModalStyled>
//     );
// };

// export default UserLogoModal;

// import React, { useState } from 'react';
// import { ContainerULM, ULMContainer, UserLogoModalBtn, UserLogoModalName} from "./UserLogoModal.styled";
// import sprite from "../../images/sprite.svg";
// import SettingModal from '../SettingModal/SettingModal';
// import UserLogoutModal from '../UserLogoutModal/UserLogoutModal';

// export const UserLogoModal = ({ isModalOpened }) => {
//     const [selectedModal, setSelectedModal] = useState(null);

//     const openModal = (modalType) => {
//         setSelectedModal(modalType);
//     };

//     const closeModal = () => {
//         setSelectedModal(null);
//     };

//     return isModalOpened ? (
//         <ContainerULM>
//             <ULMContainer>
//                 <UserLogoModalBtn type="button" onClick={() => openModal('setting')}>
//                     <svg width="16" height="16" stroke="#407BFF">
//                         <use href={sprite + "#settings"}></use>
//                     </svg>
//                     <UserLogoModalName>Setting</UserLogoModalName>
//                 </UserLogoModalBtn>
//                 <UserLogoModalBtn type="button" onClick={() => openModal('logout')}>
//                     <svg width="16" height="16" stroke="#407BFF">
//                         <use href={sprite + "#logout"}></use>
//                     </svg>
//                     <UserLogoModalName>Log out</UserLogoModalName>
//                 </UserLogoModalBtn>
//             </ULMContainer>
//             {selectedModal === 'setting' && <SettingModal onClose={closeModal} />}
//             {selectedModal === 'logout' && <UserLogoutModal onClose={closeModal} />}
//         </ContainerULM>
//     ) : null;
// };

// export default UserLogoModal;

//* Новий код, такий підхід не закриває назад модалку UserLogoModal, але інший функціонал працює і позиціонування норм.*/

import React, { useState } from 'react';
import {
  ContainerULM,
  ULMContainer,
  UserLogoModalBtn,
  UserLogoModalName,
} from './UserLogoModal.styled';
import sprite from '../../images/sprite.svg';
import SettingModal from '../SettingModal/SettingModal';
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal';

export const UserLogoModal = () => {
  const [selectedModal, setSelectedModal] = useState(null);

  const openModal = (modalType) => {
    setSelectedModal(modalType);
  };

  const closeModal = () => {
    setSelectedModal(null);
  };

  return (
    <ContainerULM>
      <ULMContainer>
        <UserLogoModalBtn type="button" onClick={() => openModal('setting')}>
          <svg width="16" height="16" stroke="#407BFF">
            <use href={sprite + '#settings'}></use>
          </svg>
          <UserLogoModalName>Setting</UserLogoModalName>
        </UserLogoModalBtn>
        <UserLogoModalBtn type="button" onClick={() => openModal('logout')}>
          <svg width="16" height="16" stroke="#407BFF">
            <use href={sprite + '#logout'}></use>
          </svg>
          <UserLogoModalName>Log out</UserLogoModalName>
        </UserLogoModalBtn>
      </ULMContainer>

      {selectedModal === 'setting' && <SettingModal onClose={closeModal} />}
      {selectedModal === 'logout' && <UserLogoutModal onClose={closeModal} />}
    </ContainerULM>
  );
};

export default UserLogoModal;


