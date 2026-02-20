import { useDispatch, useSelector } from "react-redux";
import { fetchMovie } from "../features/movie/movieSlice";
import { Input, Spin, Card, Row, Col, Typography } from "antd";
import { useEffect } from "react";
import { useState } from "react";

const { Search } = Input;
const { Title, Text } = Typography;

function MovieList() {
    const dispatch = useDispatch();
    const { movies, loading } = useSelector((state) => state.movie);
    const [search, setSearch] = useState("")
    useEffect(() => {
        dispatch(fetchMovie(""));
    }, [dispatch]);
//   const onSearch = (value) => {
//     dispatch(fetchMovie(value));
//   };
    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    );
  return (
    <div style={{ padding: 30 }}>
      <Title level={3}>Movie Search</Title>

      <Search
        placeholder="Search movies..."
        enterButton
        size="large"
        // onSearch={onSearch}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 30 }}
      />

      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredMovies.map((movie) => (
            <Col span={6} key={movie.id}>
              <Card title={movie.title}>
                <Text>{movie.body}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default MovieList;