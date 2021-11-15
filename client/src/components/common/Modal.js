import { useState } from 'react';

const withModal = ModalComponent => WrapperComponent => {
  return function (props) { 

    const [isModalShown, setIsModalShown] = useState(false);
    
    return (
      <>
        <WrapperComponent toggleModal={setIsModalShown} {...props} />
        {isModalShown && <ModalComponent toggleModal={setIsModalShown} />}
      </>
    )
  }
}

export default withModal;