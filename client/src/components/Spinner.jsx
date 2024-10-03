const Spinner = () => {
    return (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {/* Centered spinning loader */}
            <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-primary" />
        </div>
    );
};

export default Spinner;
