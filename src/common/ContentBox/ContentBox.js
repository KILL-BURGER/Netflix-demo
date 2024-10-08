import React, {useState} from 'react';

const ContentBox = ({content}) => {
    const [isFolded, setIsFolded] = useState(content.length > 250);

    const handleToggle = () => {
        setIsFolded(!isFolded);
    };

    return (
        <div>
            <div className={isFolded ? 'text-box fold' : 'text-box expand'}>
                {content}
            </div>
            {content.length > 250 && (
                <div>
                    <button className="more-btn mt-3" onClick={handleToggle}>
                        {isFolded ? '더보기' : '접기'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ContentBox;