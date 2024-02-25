import React, { useState } from 'react';
import Modal from './Modal';
import { TaskObj } from '../../types';
import TextareaAutosize from 'react-textarea-autosize';

interface ModalTaskCommentsProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    task: TaskObj;
}

const ModalTaskComments: React.FC<ModalTaskCommentsProps> = ({ isModalOpen, setIsModalOpen, task }) => {
    const [comment, setComment] = useState('');

    const Comment = () => (
        <div className="bg-[#242424] p-4 rounded-lg">
            <div className="flex justify-between items-start">
                <div className="flex items-start gap-2 text-[#7C7C7C]">
                    <div className="bg-black rounded-full">
                        <img src="/prestige-9-bo2.png" alt="" className="rounded-full w-[40px] h-[40px]" />
                    </div>
                    <span>curlos</span>
                </div>
                <div className="text-[#7C7C7C]">Jan 10</div>
            </div>
            <div className="ml-[50px]">
                On hold for now. Waiting for content changes from Taylor and Tracking tags from Stephan. I'll be real though, I don't think they're working on that at the moment. I'm pretty sure they're doing other stuff but it's up to Andres and Justin to coordinate with the marketing team.
            </div>
        </div>
    );

    return (
        <>
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} modalBodyStyles=" border-2 border-gray-700 bg-black max-w-4xl">
                <div>
                    <div className="flex justify-between items-center mb-10">
                        <div></div>
                        <div className="text-[20px] ml-4">Comment</div>
                        <div className="text-[#FF7D01] cursor-pointer" onClick={() => setIsModalOpen(false)}>Done</div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                    </div>

                    <TextareaAutosize className="mt-5 text-[16px] placeholder:text-[#7C7C7C] mb-0 bg-[#242424] p-4 rounded-lg w-full outline-none resize-none" placeholder="Add a comment" value={comment} onChange={(e) => setComment(e.target.value)}></TextareaAutosize>
                </div>
            </Modal>
        </>
    );
};

export default ModalTaskComments;