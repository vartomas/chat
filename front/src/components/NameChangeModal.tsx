import { FC, useState } from 'react';
import { useFocusTrap } from '@mantine/hooks';
import { Modal, TextInput } from '@mantine/core';

interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const NameChangeModal: FC<Props> = ({ modalOpen, setModalOpen, name, setName }) => {
  const [nameInput, setNameInput] = useState<string>(name);
  const [nameInputError, setNameInputError] = useState(false);

  const nameInputRef = useFocusTrap(true);

  return (
    <Modal
      transition="rotate-left"
      transitionDuration={500}
      transitionTimingFunction="ease"
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
      title="Prisistatyk!"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (nameInput.length > 12) {
            return setNameInputError(true);
          }
          setNameInputError(false);
          setName(nameInput);
          setModalOpen(false);
        }}
        ref={nameInputRef}
      >
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
