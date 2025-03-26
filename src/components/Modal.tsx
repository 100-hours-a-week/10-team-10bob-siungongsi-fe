interface Props {
  titleMessage: string;
  submitMessage: string;
  helperText: string | null;
  closeModal: () => void;
  onSubmit?: () => void;
}
export const Modal = ({
  titleMessage,
  submitMessage,
  helperText,
  closeModal,
  onSubmit,
}: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="flex justify-center bg-white rounded-lg">
        <div className="flex max-w-max p-8">
          <div className="flex flex-col gap-4">
            <div className="text-center">{titleMessage}</div>
            {helperText && (
              <div className="text-gray-300 text-center">{helperText}</div>
            )}
            <div className="flex justify-center gap-4">
              <button
                className="p-2 px-4 rounded-2xl bg-gray-400 text-white"
                onClick={closeModal}
              >
                닫기
              </button>
              <button
                onClick={() => {
                  onSubmit?.();
                  closeModal();
                }}
                className="p-2 px-4 rounded-2xl bg-primary text-white"
              >
                {submitMessage}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
