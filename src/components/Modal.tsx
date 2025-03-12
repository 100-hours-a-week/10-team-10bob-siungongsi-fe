interface Props {
  titleMessage: string;
  submitMessage: string;
  helperText: string | null;
}
export const Modal = ({ titleMessage, submitMessage, helperText }: Props) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="flex max-w-max p-8 border rounded-lg">
          <div className="flex flex-col gap-4">
            <div className="text-center">{titleMessage}</div>
            {helperText && (
              <div className="text-gray-300 text-center">{helperText}</div>
            )}
            <div className="flex justify-center gap-4">
              <button>닫기</button>
              <button className="bg-red-500 text-white">{submitMessage}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
