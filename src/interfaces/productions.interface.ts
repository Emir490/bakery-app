export interface ProductionsContextProps {
    items: any[];
    setItems: React.Dispatch<React.SetStateAction<any[]>>
    addProduction: () => void
}