import { FC, useState } from 'react';
import { useFocusTrap } from '@mantine/hooks';
import { Modal, TextInput } from '@mantine/core';
import { useDispatch } from 'react-redux';

import { actions } from '../state/actions';

interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NameChangeModal: FC<Props> = ({ modalOpen, setModalOpen }) => {
  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState<string>('');
  const [nameInputError, setNameInputError] = useState(false);

  const nameInputRef = useFocusTrap(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameInput.length > 12) {
      return setNameInputError(true);
    }
    setNameInputError(false);
    dispatch(actions.user.setName(nameInput));
    localStorage.setItem('name', nameInput);
    setModalOpen(false);
  };

  return (
    <Modal
      transition="rotate-left"
      transitionDuration={500}
      transitionTimingFunction="ease"
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
      title="Prisistatyk!"
    >
      <form onSubmit={handleSubmit} ref={nameInputRef}>
        <TextInput
          value={nameInput}
          onChange={(e) => setNameInput(e.currentTarget.value)}
          data-autofocus
          error={nameInputError ? 'Vardas per ilgas' : false}
        />
      </form>
    </Modal>
  );
};

export default NameChangeModal;
