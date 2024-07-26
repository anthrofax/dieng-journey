type OptionsParameter = {
    judul: string;
    pesan: string;
    labelIya: string;
    labelTidak: string;
    onClickIya: () => void;
    onClickTidak: () => void;
  };
  
  function confirmationBoxOption({
    judul,
    pesan,
    labelIya,
    labelTidak,
    onClickIya,
    onClickTidak,
  }: OptionsParameter) {
    return {
      title: judul,
      message: pesan,
      buttons: [
        {
          label: labelIya,
          onClick: onClickIya,
        },
        {
          label: labelTidak,
          onClick: onClickTidak,
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => {},
      afterClose: () => {},
      onClickOutside: () => {},
      onKeypress: () => {},
      onKeypressEscape: () => {},
      overlayClassName: "overlay-custom-class-name",
    };
  }
  
  export default confirmationBoxOption;
  