import carImage from '../../assets/car.png';
import favoriteIcon from '../../assets/favorite.svg';
import { db } from '../../firebase/firebase';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { useState, useEffect } from 'react';

interface Ad {
    id: string;
    title: string;
    category: string;
    price: string;
    description: string;
    imageUrl?: string;
}

const Cards: React.FC = () => {
    const [ads, setAds] = useState<Ad[]>([]);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "ads"));
                const adsData: Ad[] = querySnapshot.docs.map((doc: DocumentData) => ({
                    ...doc.data(),
                    id: doc.id
                }) as Ad);
                setAds(adsData);
            } catch (error) {
                console.error("Error fetching ads:", error);
            }
        };

        fetchAds();
    }, []);

    return (
        <div className="p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen">
            <h1 style={{ color: '#002f34' }} className="text-2xl">Fresh recommendations</h1>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5">
                {ads.map(product => (
                    <div 
                        key={product.id} 
                        style={{ borderWidth: '1px', borderColor: 'lightgray' }} 
                        className="relative w-full h-72 rounded-md border-solid bg-gray-50 overflow-hidden cursor-pointer"
                    >
                        <div className="w-full flex justify-center p-2 overflow-hidden">
                            {product.imageUrl ? (
                                <img className="h-36 object-contain" src={product.imageUrl} alt={product.title} />
                            ) : (
                                <img className="h-36 object-contain" src={carImage} alt="Placeholder" />
                            )}
                        </div>
                        <div className="details p-1 pl-4 pr-4">
                            <h1 style={{ color: '#002f34' }} className="font-bold text-xl">{product.price}</h1>
                            <p className="text-sm pt-2">{product.title}</p>
                            <p className="text-sm pt-2">{product.category}</p>
                            <p className="text-xs pt-1 text-gray-500">
                                {product.description}
                            </p>
                        </div>
                        <div className="absolute flex justify-center items-center p-2 bg-white rounded-full top-3 right-3 cursor-pointer">
                            <img className="w-5" src={favoriteIcon} alt="Favorite Icon" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cards;
