import React, { Component } from 'react';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import axios from "axios";

class App extends Component {

    constructor(props) {
        super(props);


        this.state = {
            books: [],
            newBookData: {
                title: '',
                rating: '',
                date: ''
            },
            editBookData: {
                id: '',
                title: '',
                rating: '',
                date: ''
            },
            newBookModal: false,
            editBookModal: false
        };
    }


    componentDidMount() {
        this.refreshBooks();

    }

    refreshBooks() {
        axios.get('http://localhost:8080/books')
            .then((response) => {
                this.setState({
                    books: response.data,
                    editBookModal: false,
                    editBookData: {
                        id: '',
                        title: '',
                        rating: '',
                        date: ''
                    }
                });
            });
    }

    showAddBookModal = () => {
        this.setState({
            newBookModal: true
        });
    };

    hideAddBookModal = () => {
        this.setState({
            newBookModal: false,
            editBookModal: false
        });
    };

    addBook = () => {
        let { newBookData } = this.state;
        newBookData.date = new Date().toLocaleTimeString();

        axios.post("http://localhost:8080/books", newBookData);
    };

    updateBook = () => {
        const { title, rating, id } = this.state.editBookData;
        const date = new Date().toLocaleTimeString();

        axios.put(`http://localhost:8080/books/${ id }`, {
            title,
            rating,
            date
        })
            .then((response) => {
                this.refreshBooks();
            });
    };

    editBook(id, title, rating) {

        this.setState({
            editBookData: { id, title, rating },
            editBookModal: !this.state.editBookModal
        });
    }

    deleteBook(id) {
        axios.delete('http://localhost:8080/books/' + id).then((response) => {
            this.refreshBooks();
        });
    }


    render() {
        let books = this.state.books.map((book) => {
            return (
                <tr key={ book.id }>
                    {/*{<Time date={new Date()} />}*/ }
                    <td>{ book.id }</td>
                    <td>{ book.title }</td>
                    <td>{ book.rating }</td>
                    <td>{ book.date }</td>
                    <td>
                        <Button
                            color="success" size="sm" className="mr-2"
                            onClick={ this.editBook.bind(this, book.id, book.title, book.rating) }
                        >Edit</Button>
                        <Button color="danger" size="sm" onClick={ this.deleteBook.bind(this, book.id) }>Delete</Button>
                    </td>
                </tr>
            );
        });

        return (
            <div className="App container">

                <h1>App</h1>

                <Button color="primary" onClick={ this.showAddBookModal }>Create book</Button>

                <Modal isOpen={ this.state.newBookModal } toggle={ this.hideAddBookModal }>
                    <ModalHeader toggle={ this.hideAddBookModal }>Add new book at
                        {/*<div value={this.state.newBookData.date}/>*/ }
                        {/*<Time date={new Date()}/>*/ }
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label for="title">title</Label>
                            <Input
                                id="title"
                                onChange={ (e) => {
                                    let { newBookData } = this.state;
                                    newBookData.title = e.target.value;
                                    this.setState({ newBookData });
                                } }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="rating">rating</Label>
                            <Input
                                id="rating"
                                onChange={ (e) => {
                                    let { newBookData } = this.state;
                                    newBookData.rating = e.target.value;
                                    this.setState({ newBookData });
                                } }
                            />

                        </FormGroup>
                    </ModalBody>


                    <ModalFooter>
                        <Button color="primary" onClick={ this.addBook }>Add book </Button>
                        <Button color="secondary" onClick={ this.hideAddBookModal }>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={ this.state.editBookModal } toggle={ this.hideAddBookModal }>
                    <ModalHeader toggle={ this.hideAddBookModal }>Edit a new book</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">title</Label>
                            <Input
                                id="title"
                                value={ this.state.editBookData.title }
                                onChange={ (e) => {
                                    let { editBookData } = this.state;
                                    editBookData.title = e.target.value;
                                    this.setState({ editBookData });
                                } }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="rating">rating</Label>
                            <Input
                                id="rating"
                                value={ this.state.editBookData.rating }
                                onChange={ (e) => {
                                    let { editBookData } = this.state;
                                    editBookData.rating = e.target.value;
                                    this.setState({ editBookData });
                                } }
                            />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={ this.updateBook }>Update book </Button>
                        <Button color="secondary" onClick={ this.hideAddBookModal }>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Table hover size="sm" responsive dark>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Rating</th>
                        <th>Date</th>
                    </tr>
                    </thead>

                    <tbody>
                    { books }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default App;