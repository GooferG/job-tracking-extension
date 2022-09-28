import React, { useState, useEffect, useRef } from 'react';
import { UserAuth } from '../context/AuthContext';
import jsPDF from 'jspdf';

const CoverLetter = () => {
  // const ReactQuill =
  // typeof window === 'object' ? require('react-quill') : () => false;
  const refVar = useRef();

  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user, addData, data, updateData } = UserAuth();

  const handleSave = async () => {
    setIsLoading(true);

    try {
      addData(`users`, user.uid, {
        ...data,
        coverLetter: value
      });

      setTimeout(() => {
        setIsLoading(false);
        updateData();
      }, 1000);
    } catch (error) {
      console.log('Error: ', error);
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.html(refVar.current, {
      callback: pdf => {
        pdf.save('my.pdf');
      }
    });
  };

  useEffect(() => {
    if (data?.coverLetter) {
      setValue(data.coverLetter);
    }
  }, [data]);

  return (
    <div className="flex flex-col h-full justify-between">
      {/* <div
        className="pdf-style invisible"
        ref={refVar}
        dangerouslySetInnerHTML={{ __html: value }}
      ></div> */}

      <div className="justify-end flex">
        <button
          onClick={handleSave}
          className={`btn btn-sm focus:outline-none w-full sm:w-auto bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 text-sm mr-5 ${
            isLoading ? 'loading' : ''
          }`}
        >
          Save
        </button>
        <button
          onClick={handleExport}
          className={`btn btn-sm focus:outline-none w-full sm:w-auto bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 text-sm ${
            isLoading ? 'loading' : ''
          }`}
        >
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default CoverLetter;
