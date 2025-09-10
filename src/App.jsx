import Header from "./components/Header";
import ProfileCard from "./components/ProfileCard";
import Counter from "./components/Counter";
import LikeToggle from "./components/LIkeToggle";
import Footer from "./components/Footer";
export default function App() {
    return (
        <div className="container">
            <header />
            <ProfileCard
            name='황준성'
            mafor='인공지능'
            interests = {['Music']}
            />
            <Counter />
            <LikeToggle />
            <Footer />
        </div>
    );
}