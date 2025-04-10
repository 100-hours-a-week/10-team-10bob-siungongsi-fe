interface Props {
  modalContent: {
    titleMessage: string;
    submitMessage: string;
    helperText: string | null;
    closeModal: () => void;
    onSubmit?: () => void;
    isOpen?: boolean;
  };
}

export const Modal = ({ modalContent }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[1000]">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-sm mx-auto overflow-hidden">
        <div className="p-5">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-gray-900 text-center">
              {modalContent.titleMessage}
            </h3>

            {modalContent.helperText && (
              <p className="mt-2 text-gray-500 text-center text-sm">
                {modalContent.helperText}
              </p>
            )}
          </div>

          <div className="flex justify-center space-x-3">
            <button
              className="flex-1 py-2.5 px-4 rounded-full bg-gray-100 text-gray-700 font-medium transition-all hover:bg-gray-200"
              onClick={modalContent.closeModal}
            >
              닫기
            </button>
            <button
              onClick={() => {
                modalContent.onSubmit?.();
                modalContent.closeModal();
              }}
              className="flex-1 py-2.5 px-4 rounded-full bg-primary text-white font-medium transition-all hover:opacity-90 shadow-sm"
            >
              {modalContent.submitMessage}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
