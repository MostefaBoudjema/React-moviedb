interface HeaderTitleProps {
    value: string;
}

export const HeaderTitle: React.FC<HeaderTitleProps> = ({ value }) => {
    return <h1 className="text-center mb-4 py-4">{value}</h1>;
};
