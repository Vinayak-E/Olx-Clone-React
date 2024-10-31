import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SellPage = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
     const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate(); 

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

   
const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setImage(file);
        setPreviewImage(URL.createObjectURL(file));
    } else {
        setPreviewImage(null);
    }
};

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || !category || !price || !description || !image) {
            toast.error('Please fill in all required fields.');
            return;
        }

        try {
            const imageRef = ref(storage, `ads/${image.name}`);
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);

            await addDoc(collection(db, 'ads'), {
                title,
                category,
                price,
                description,
                imageUrl,
                createdAt: new Date()
            });

            toast.success('Ad posted successfully!');
            setTimeout(() => {
                navigate('/');
            }, 2000);

            setTitle('');
            setCategory('');
            setPrice('');
            setDescription('');
            setImage(null);
            setPreviewImage(null);
        } catch (error) {
            console.error("Error posting ad:", error);
            toast.error('Failed to post ad.');
        }
    };

    const handleBackClick = () => {
        navigate('/'); 
    };

    return (
        <nav>
            <ToastContainer />
            <div className="flex items-center z-50 w-full h-16 p-3 pr-3 pl-3 shadow-md bg-slate-100 border-b-2 border-solid border-b-white">
                <FontAwesomeIcon className="pl-5 cursor-pointer" icon={faArrowLeft} onClick={handleBackClick} />
            </div>

            <div className="flex justify-center py-10 bg-gray-50 mt-6">
                <div className="w-full max-w-2xl p-6 bg-white rounded-md shadow-md">
                    <h1 className="text-2xl font-bold text-center mb-6">POST YOUR AD</h1>

                    <form onSubmit={handleSubmit}>
                     
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-800">Enter the Title *</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter ad title"
                                className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-800">Select Category *</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                            >
                                <option>Select Category</option>
                                <option>Cars</option>
                                <option>Mobiles</option>
                                <option>Bikes</option>
                                <option>Furniture</option>
                                <option>Fashion</option>
                                <option>Pets</option>
                                <option>Properties</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-800">Price *</label>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Enter Price"
                                className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-800">Description *</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Include condition, features, and reason for selling"
                                className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                                rows={4}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-800">Upload Image *</label>
                            <div
                                className="flex items-center justify-center w-full h-48 mt-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer overflow-hidden"
                                onClick={handleImageClick}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                {previewImage ? (
                                    <img src={previewImage} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                                ) : (
                                    <span className="text-gray-400">Drag and drop or click to upload an image</span>
                                )}
                            </div>
                        </div>

                        <button type="submit" className="bg-black text-white rounded-md px-4 py-2 mt-8">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default SellPage;
