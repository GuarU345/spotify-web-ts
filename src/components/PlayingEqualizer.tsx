const equalizerStyles = {
    container: "flex items-end justify-between w-5 h-5",
    bar: "w-[3px] bg-green-500 rounded-sm animate-eq"
};

export const PlayingEqualizer = () => {
    return (
        <div className={equalizerStyles.container}>
            <div className={`${equalizerStyles.bar}`} style={{ animationDelay: '0.0s', height: '60%' }}></div>
            <div className={`${equalizerStyles.bar}`} style={{ animationDelay: '0.2s', height: '100%' }}></div>
            <div className={`${equalizerStyles.bar}`} style={{ animationDelay: '0.4s', height: '80%' }}></div>
            <div className={`${equalizerStyles.bar}`} style={{ animationDelay: '0.1s', height: '40%' }}></div>
        </div>
    );
};