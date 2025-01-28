

const Calculator = () => {
    return (
        <>
            <div className="bg-white rounded-2xl p-5">
                <div className="w-full flex justify-center items-center gap-2.5 mb-2.5">
                    <input type="text" id="display" readOnly
                           className="w-40 h-12 text-xl text-right mb-2.5 p-3 bg-[#dbefdf] border-none rounded-lg"/>
                    <button id="clear"
                            className="w-[50px] h-[50px] border-none rounded-full bg-[#f84033] text-white mb-2.5">AC
                    </button>
                </div>
                <div className="grid grid-cols-4 gap-2.5">
                    <button className="w-[50px] h-[50px] text-lg border-none rounded-full cursor-pointer bg-[#92e9fa]"
                            data-value="7">7
                    </button>
                    <button className="w-[50px] h-[50px] text-lg border-none rounded-full cursor-pointer bg-[#92e9fa]"
                            data-value="8">8
                    </button>
                    <button className="w-[50px] h-[50px] text-lg border-none rounded-full cursor-pointer bg-[#92e9fa]"
                            data-value="9">9
                    </button>
                    <button
                        className="w-[50px] h-[50px] text-lg border-none rounded-full cursor-pointer bg-[#ede467] text-black flex justify-center items-center"
                        data-value="+">+
                    </button>
                    <button className="w-[50px] h-[50px] text-lg border-none rounded-full cursor-pointer bg-[#92e9fa]"
                            data-value="4">4
                    </button>
                    <button className="w-[50px] h-[50px] text-lg border-none rounded-full cursor-pointer bg-[#92e9fa]"
                            data-value="5">5
                    </button>
                    <button className="w-[50px] h-[50px] text-lg border-none rounded-full cursor-pointer bg-[#92e9fa]"
                            data-value="6">6
                    </button>
                    <button
                        className="w-[50px] h-[50px] text-lg border-none rounded-full cursor-pointer bg-[#ede467] text-black flex justify-center items-center"
                        data-value="-">-
                    </button>
                    <button className="w-[50px] h-[50px] text-lg border-none rounded-full cursor-pointer bg-[#92e9fa]"
                            data-value="1">1
                    </button>
                    <button className="w-[50px] h-[50px] text-lg border-none rounded-full cursor-pointer bg-[#92e9fa]"
                            data-value="2">2
                    </button>
                    <button className="w-[50px] h-[50px] text-lg border-none rounded-full cursor-pointer bg-[#92e9fa]"
                            data-value="3">3
                    </button>
                    <button
                        className="w-[50px] h-[50px] text-lg border-none rounded-full cursor-pointer bg-[#ede467] text-black flex justify-center items-center"
                        data-value="*">*
                    </button>
                    <button className="w-[50px] h-[50px] text-lg border-none rounded-full cursor-pointer bg-[#92e9fa]"
                            data-value="0">0
                    </button>
                    <button className="w-[50px] h-[50px] text-lg border-none rounded-full cursor-pointer bg-[#92e9fa]"
                            data-value=".">.
                    </button>
                    <button id="equals"
                            className="w-[50px] h-[50px] text-lg border-none rounded-full cursor-pointer bg-[#c271c5] text-white">=
                    </button>
                    <button
                        className="w-[50px] h-[50px] text-lg border-none rounded-full cursor-pointer bg-[#ede467] text-black flex justify-center items-center"
                        data-value="/">/
                    </button>
                </div>
            </div>
        </>
    );
};

export default Calculator;