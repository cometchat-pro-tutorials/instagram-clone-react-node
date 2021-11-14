import { useState } from 'react';

const withModal = ModalComponent => WrapperComponent => {
  return function () { 

    const [isModalShown, setIsModalShown] = useState(false);
    
    return (
      <>
        <WrapperComponent toggleModal={setIsModalShown}/>
        {isModalShown && <ModalComponent toggleModal={setIsModalShown} />}
      </>
    )
  }
}

export default withModal;