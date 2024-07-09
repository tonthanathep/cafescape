"use client";
import axios from "axios";
import { Dispatch, useEffect, useState } from "react";

interface Props {
  userData: any;
  open?: boolean;
  setOpen?: Dispatch<boolean>;
}

const EditProfileModal = ({ userData, open, setOpen }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name: userData.full_name,
    nick_name: userData.nick_name,
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const updatedData = async () => {
      await axios
        .put("/api/user", {
          ...userData,
          full_name: formData.full_name,
          nick_name: formData.nick_name,
        })
        .then((res) => {
          console.log(res);
          setIsOpen(false);
        });
    };
    updatedData();
  };

  useEffect(() => {
    setIsOpen(open || false);
  }, [open]);

  return (
    <div>
      {open === undefined && (
        <button className='btn btn-primary' onClick={() => setIsOpen(true)}>
          Edit
        </button>
      )}
      {isOpen && (
        <div className='modal modal-open'>
          <div className='flex flex-col p-5 bg-white rounded-2xl'>
            <h2 className='font-bold text-lg'>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Full Name</span>
                </label>
                <input
                  type='text'
                  name='full_name'
                  className='input input-primary'
                  value={formData.full_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Short Name</span>
                </label>
                <input
                  type='text'
                  name='nick_name'
                  className='input input-bordered'
                  value={formData.nick_name}
                  onChange={handleInputChange}
                />
              </div>
              {/* Add other profile fields as needed */}
              <div className='modal-action'>
                <button type='submit' className='btn btn-primary'>
                  Save
                </button>
                <button
                  type='button'
                  className='btn'
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileModal;
