

const SectionTitle = ({ subHeading, heading }) => {
    return (
        <div className="w-9/12 md:w-1/3 mx-auto text-center my-8">
            <p className="text-yellow-600 italic pb-4">--- {subHeading} ---</p>
            <h3 className="text-2xl border-y-4 py-4 uppercase">{heading}</h3>
        </div>
    );
};

export default SectionTitle;