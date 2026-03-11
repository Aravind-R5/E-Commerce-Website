import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CompareContext = createContext();

export function CompareProvider({ children }) {
    const [compareList, setCompareList] = useState(() => {
        const saved = localStorage.getItem('compareList');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('compareList', JSON.stringify(compareList));
    }, [compareList]);

    const addToCompare = (product) => {
        if (compareList.find(item => item.id === product.id)) {
            toast.info(`${product.name} is already in compare list.`);
            return;
        }
        if (compareList.length >= 4) {
            toast.warning('You can only compare up to 4 items at a time.');
            return;
        }
        setCompareList([...compareList, product]);
        toast.success(`${product.name} added to compare list!`);
    };

    const removeFromCompare = (productId) => {
        setCompareList(compareList.filter(item => item.id !== productId));
        toast.info('Item removed from compare list');
    };

    const isInCompare = (productId) => {
        return compareList.some(item => item.id === productId);
    };

    const clearCompare = () => {
        setCompareList([]);
        toast.info('Compare list cleared');
    };

    return (
        <CompareContext.Provider value={{
            compareList,
            addToCompare,
            removeFromCompare,
            isInCompare,
            clearCompare
        }}>
            {children}
        </CompareContext.Provider>
    );
}

export const useCompare = () => {
    const context = useContext(CompareContext);
    if (!context) throw new Error('useCompare must be used within CompareProvider');
    return context;
};
