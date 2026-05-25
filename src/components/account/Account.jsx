import Menu from "../ui/Menu.jsx";

export default function Account() {

    return (
        <div className="flex w-full">
            <Menu/>
            <div id="dashboardContent" className="w-full pl-3">
                <div id="profileCard">
                    <a href="/account/profile">Profile</a>
                </div>
                <div id="projectCard">
                    <a href="/account/projects">Projects</a>
                </div>
                <div id="vocabCard">
                    <a href="/account/vocab">Vocab Lists</a>
                </div>
            </div>
        </div>
    )
}