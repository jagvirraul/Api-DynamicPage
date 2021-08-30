import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
const Main = () => {
    const [items, setItems] = useState([]);
    const [metaData, setMetaData] = useState({ page: 1, total_page: 2 });
    const getData = (page = 1) => {
        axios.get(`https://reqres.in/api/users?page=${page}`)
            .then((response) => {
                console.log("response.data", response.data);
                setMetaData(response.data)
                setItems(response.data.data);
            })
            .catch((error) => {
                alert(error.message)
            });
    }
    useEffect(() => {
        getData(1);
    }, [])
    return (
        <div className="main-container">
            <div className="heading">
                <h1>Employee Data</h1>
            </div>
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Avatar</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((elem) => {
                        return (
                            <tr>
                                <th scope="row">{elem.id}</th>
                                <th><img src={elem.avatar} alt="avatar" /></th>
                                <td>{elem.first_name}</td>
                                <td>{elem.last_name}</td>
                                <td>{elem.email}</td>
                            </tr>
                        );
                    }
                    )}
                </tbody>
            </Table>
            <div className="pagination-container">
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'.......'}
                    breakClassName={'break-me'}
                    pageCount={metaData.total_pages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={({ selected }) => getData(selected + 1)}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />

            </div>


        </div>
    );
}

export default Main;


