import React from "react";
import UserList from "./components/UserList";
import UserAddForm from "./components/UserAddForm";
import PostList from "./components/PostList";
import "./App.css";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            color: "black",
            background: "linear-gradient(to right, #de6262, #ffb88c)",
            users: [],
            posts: [],
            isDisplayed: true
        };
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(data => {
                data = data.filter(post => post.id < 4);

                this.setState({ posts: data });
            });

        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data = data.filter(user => user.id < 4);
                data.forEach(user => {
                    user.isGoldClient = false;
                    user.salary = `$${Math.round(Math.random() * 10000)} / month`;
                    user.photo = `https://picsum.photos/${Math.round(200 + Math.random() * 20)}`;
                });

                this.setState({ users: data });
            });
    }

    changeColor(event) {
        this.setState({ background: event.target.value });
    }

    changeTextColor(event) {
        this.setState({ color: event.target.value });
    }

    showUsers() {
        this.setState({ isDisplayed: true });
    }

    showPosts() {
        this.setState({ isDisplayed: false });
    }

    getMaxId(users) {
        let maxId = 0;

        users.forEach(user => {
            if (user.id > maxId) {
                maxId = user.id;
            }
        });

        return maxId;
    }

    submitAddForm(event, name, email, isGoldClient) {
        event.preventDefault();

        if (name === "" || email === "") {
            alert("Va rugam sa introduceti datele pentru utilizator");
            return;
        }

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email.trim())) {
            alert("Email invalid");
            return;
        }

        this.setState(prevState => {
            return {
                users: [
                    ...prevState.users,
                    {
                        id: this.getMaxId(prevState.users) + 1,
                        name,
                        email,
                        isGoldClient
                    }
                ]
            };
        });
    }

    deleteUser = userId => {
        const filteredUsers = this.state.users.filter(user => user.id !== userId);
        this.setState({ users: filteredUsers });
    };

    render() {
        return (
            <div className="app" style={{ background: this.state.background, color: this.state.color }}>
                <h1>Admin panel - Proiectul 1</h1>

                <UserAddForm
                    submitAddForm={(event, name, email, isGoldClient) =>
                        this.submitAddForm(event, name, email, isGoldClient)
                    }
                />

                {this.state.isDisplayed ? (
                    <UserList deleteUser={this.deleteUser} users={this.state.users} />
                ) : (
                    <PostList posts={this.state.posts} />
                )}

                <div className="background-color-input">
                    <p>Schimba fundalul:</p>
                    <input type="color" onChange={event => this.changeColor(event)} />
                </div>
                <div className="text-color-input">
                    <p>Schimba culoarea textului:</p>
                    <input type="color" onChange={event => this.changeTextColor(event)} />
                </div>

                <div className="buttons">
                    <button className="button-small" onClick={() => this.showUsers()}>
                        Afiseaza useri
                    </button>
                    <button className="button-small" onClick={() => this.showPosts()}>
                        Afiseaza postari
                    </button>
                </div>
            </div>
        );
    }
}

export default App;
