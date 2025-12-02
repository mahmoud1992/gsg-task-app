import SearchNotFoundIcon from "./icons/SearchNotFoundIcon";

export default function CharacterNotFound() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "justify-center",
                marginTop: "40px",
                alignItems: "center"
            }}>
            <SearchNotFoundIcon />
            <h2 className="text-2xl font-semibold text-gray-800">Character not found</h2>
            <p className="text-gray-500 mt-2">Try searching for a different name.</p>
        </div>
    );
}