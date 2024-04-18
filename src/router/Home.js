import Album from '../container/Album';
import React from "react";
import {site_url} from "../lib/global";
import {useSearchParams} from "react-router-dom";
import axios from "axios";


function Home(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = React.useState(null);
    const [page, setPage] = React.useState(1);

    const handlePageChange = async (event, value) => {
        setPage(value);
        setSearchParams({
            page: value,
        });
    };

    const handleChange = (page) => {
        props.setLoading(true);
        axios
            .get(site_url+'/vsapi/v1/?page='+page)
            .then((res) => {
                setData(res.data);
                props.setLoading(false);
            })
    }

    React.useEffect(() => {
        if(searchParams.get("page")) {
            setPage(searchParams.get("page"));
            handleChange(searchParams.get("page"));
        }
        else
            handleChange(page);
    }, [page]);

    if (!data) return null;
    return (
        <div>
            <Album data={data} handlePageChange={handlePageChange} {...props} />
        </div>
    );
}

export default Home;
