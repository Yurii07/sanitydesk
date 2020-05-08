import React, {Component} from 'react';
import {Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button} from 'reactstrap';
import axios from "axios";

class App extends Component {

    state = {
        books: [],
        newBookData: {
            title: '',
            rating: '',
            date: ''
        },
        editBookData: {
            id: '',
            title: '',
            rating: ''
        },
        newBookModal: false,
        editBookModal: false
    }

    componentWillMount() {
        this._refreshBooks()
    }
    _refreshBooks() {
        axios.get('http://localhost:8080/books').then((response) => {
            this.setState({
                books: response.data
            })
        })
    }

    toggleNewBookModal() {
        let {newBookData} = this.state;
        this.state.newBookData.date = new Date().toLocaleTimeString();

        this.setState({
            newBookData,
            newBookModal: !this.state.newBookModal
        })
    }

    toggleEditBookModal() {
        this.setState({
            editBookModal: !this.state.editBookModal
        })
    }

    addBook() {
        axios.post('http://localhost:8080/books', this.state.newBookData)
            .then((response) => {
                let {books} = this.state;
                books.push(response.data)
                this.setState({
                    books,
                        newBookModal: false,
                        newBookData: {
                            title: '',
                            rating: '',
                            date:''
                        }
                })
            })
    }

    updateBook() {
        let {title, rating} = this.state.editBookData;

        axios.put('http://localhost:8080/books/' + this.state.editBookData.id, {
            title, rating
        }).then((response) => {
            // console.log(response.data);
            this._refreshBooks();

            this.setState({
                editBookModal: false, editBookData: {id: '', title: '', rating: ''}
            })
        })
    }

    editBook(id, title, rating) {
        this.setState({
            editBookData: {id, title, rating}, editBookModal: !this.state.editBookModal
        })
    }

    deleteBook(id) {
        axios.delete('http://localhost:8080/books/' + id).then((response) => {
            this._refreshBooks();
        })
    }


    render() {
        let books = this.state.books.map((book) => {
            return (
                <tr key={book.id}>
                    {/*{<Time date={new Date()} />}*/}
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.rating}</td>
                    <td>{book.date}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2"
                                onClick={this.editBook.bind(this, book.id, book.title, book.rating)}>Edit</Button>
                        <Button color="danger" size="sm" onClick={this.deleteBook.bind(this, book.id)}>Delete</Button>
                    </td>
                </tr>
            )
        })

        return (
            <div className="App container">

                <h1>App</h1>

                <Button color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add book</Button>

                <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add new book at
                        {/*<div value={this.state.newBookData.date}/>*/}
                        {/*<Time date={new Date()}/>*/}
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label for="title">title</Label>
                            <Input id="title" value={this.state.newBookData.title} onChange={(e) => {
                                let {newBookData} = this.state;
                                newBookData.title = e.target.value;
                                this.setState({newBookData})
                            }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="rating">rating</Label>
                            <Input id="rating" value={this.state.newBookData.rating} onChange={(e) => {
                                let {newBookData} = this.state;
                                newBookData.rating = e.target.value;
                                this.setState({newBookData})
                            }}/>

                        </FormGroup>
                    </ModalBody>


                    <ModalFooter>
                        <Button color="primary" onClick={this.addBook.bind(this)}>Add book </Button>
                        <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
                    <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a new book</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">title</Label>
                            <Input id="title" value={this.state.editBookData.title} onChange={(e) => {
                                let {editBookData} = this.state;
                                editBookData.title = e.target.value;
                                this.setState({editBookData})
                            }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="rating">rating</Label>
                            <Input id="rating" value={this.state.editBookData.rating} onChange={(e) => {
                                let {editBookData} = this.state;
                                editBookData.rating = e.target.value;
                                this.setState({editBookData})
                            }}/>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.updateBook.bind(this)}>Update book </Button>
                        <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Rating</th>
                        <th>Date</th>
                    </tr>
                    </thead>

                    <tbody>
                    {books}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default App;
