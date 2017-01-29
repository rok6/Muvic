var Hello = React.createClass({
  render: function() {
    return (
      <h2 className="hello">
        Hello, world! I am a CommentBox.
      </h2>
    );
  }
});
ReactDOM.render(
  <Hello />,
  $('.hello').get(0)
);

var DataBox = React.createClass({
  loadData: function () {
    $.ajax( {
      url: this.props.url,
      dataType: 'json',
      cache: false
    })
    .then(
      function (data) {
        console.log( '-- ajax: success' );
        console.log(data);
        this.setState( { data: data } );
      }.bind(this),
      function (xhr, status, err) {
        console.log( '-- ajax: error');
        console.error( this.props.url, status, err.toString() );
      }.bind(this)
    );
  },
  getInitialState: function () {
    return { data: [] };
  },
  componentDidMount: function() {
    this.loadData();
  },
  render: function () {
    var list = [];
    var data = this.state.data;
    for(var i in data){
      list.push(<DataItem data={data[i]}>This is one data</DataItem>);
    }
    return (
      <div className="dataBox">
        <h3>Data List</h3>
        <ul>
          {list}
        </ul>
      </div>
    );
  }
});

var DataItem = React.createClass({
  render: function() {
    return (
      <li className="data-items">
        <h4>{this.props.data['title']['rendered']}</h4>
      </li>
    );
  }
});

ReactDOM.render(
  <DataBox url="http://r66.glbd.jp/wp-json/wp/v2/posts" />,
  $('.data-container').get(0)
);
