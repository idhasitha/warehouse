import React from "react";

interface ModalProps {
  showModal: boolean;
  setShowModal: any;
  title: any;
  children: any;
  submitData?: any;
}

const Modal = ({ showModal, setShowModal, title, children, submitData }: ModalProps) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-25 bg-blend-exclusion outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-auto max-w-7xl h-[700px]">
              <div className="relative flex w-full h-full flex-col rounded-sm border-0 bg-white shadow-lg outline-none focus:outline-none">
                <div className="flex items-start justify-between rounded-t border-b border-solid border-gray-300 p-3 ">
                  <h3 className="font=semibold text-3xl">{title}</h3>
                  <button
                    className="float-right border-0 bg-transparent text-black"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="opacity-7 block h-6 w-6 rounded-full py-0 text-xl text-black">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative flex-auto p-6 h-full overflow-auto">{children}</div>
                <div className="border-blueGray-200 flex items-center justify-end gap-[12px] rounded-b border-t border-solid p-3">
                  <button
                    className="rounded-sm border border-gray-500 bg-transparent px-4 py-3 text-sm font-semibold text-[#00598d] hover:border-transparent hover:bg-[#00598d] hover:text-white"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="rounded-sm border-transparent bg-[#00598d] px-4 py-3 text-sm font-semibold text-white hover:border hover:border-gray-500 hover:bg-transparent hover:text-[#00598d]"
                    onClick={() => {
                      setShowModal(false);
                      submitData()
                    }}
                  >
                    Add to Location
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
