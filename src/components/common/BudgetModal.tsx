import { BUDGET } from "@/constants/BudgetText";

const BudgetModel = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            {/* Backdrop overlay */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal container */}
            <div className="relative bg-[#000000] my-4 md:my-[71px] rounded-[8px] border border-[#333333] mx-auto 
                          h-auto p-4 md:p-[32px] shadow-lg w-full max-w-[480px]">
                {BUDGET.content.map((budget, i) => (
                    <div
                        key={i}
                        className={`${i !== BUDGET.content.length - 1 ? 'border-b border-[#222222] mb-4 md:mb-6' : ''}`}
                    >
                        {/* Budget item header */}
                        <div className="flex justify-between">
                            <p className="text-[14px] md:text-[16px] leading-6 font-normal font-sans text-[#E0E0E0]">
                                {budget.head}
                            </p>
                            <p className="text-[12px] md:text-[13px] p-1 leading-[14px] text-[#727272]">
                                {budget.price}
                            </p>
                        </div>

                        {/* Budget item description */}
                        <div className={`${i !== BUDGET.content.length - 1 ? 'mb-4 md:mb-6' : ''}`}>
                            <p className="text-[#BABABA] font-sans text-[13px] md:text-[14px] leading-5">
                                {budget.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BudgetModel;