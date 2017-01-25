import React from 'react';
import ReactDOM from 'react-dom';

const ITEMS_ON_PAGE = 4;

class AstronautsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: "",
      page: 1,
      pages: [],
      modal: false,
    };

    this.openCloseModal = this.openCloseModal.bind(this);
    this.filtration = this.filtration.bind(this);
    this.pagination = this.pagination.bind(this);
    this.resetPages = this.resetPages.bind(this);
  }

  openCloseModal() {
    this.setState({ modal: !this.state.modal })
  }

  filtration(event) {
    this.setState({ filterValue: event.target.value });
  }

  pagination(page) {
    this.setState({ page });
  }

  resetPages(list) {
    this.state.pages.splice(0, this.state.pages.length);

    list.astro.map((item, i) => {
      const itemPage = ( Math.floor(i / ITEMS_ON_PAGE) + 1 );
      item.page = itemPage;

      if ( this.state.pages[this.state.pages.length-1] !== itemPage ) {
        this.state.pages.push(itemPage);
      }
    })

    return list;
  }

  renderList(astro) {
    const filterPhrase = this.state.filterValue.toLowerCase();
    const filteredList = { astro: astro.filter(item => ~item.name.toLowerCase().indexOf(filterPhrase)) };
    const numberedList = this.resetPages(filteredList);

    return { astro: numberedList.astro.filter(item => item.page === this.state.page) };
  }

  render() {
    const { astro, addAstronaut, deleteAstronaut } = this.props;
    const renderList = this.renderList(astro);

    return (
      <div className="page">
        <h1 className="section section__header">Astronauts</h1>
        <div className="section section__filter">
          <Filter filtration={this.filtration}/>
        </div>
        <ListItems notes = {renderList} removeItem = {deleteAstronaut} />
        <div className="section section__footer">
          <AddNew openCloseModal={this.openCloseModal} />
          <Pagination pages={this.state.pages} pagination={this.pagination} />
        </div>
        <Modal isShowModal = {this.state.modal} openCloseModal = {this.openCloseModal} addItem = {addAstronaut}/>
      </div>
    );
  }
}

function Filter(props) {
  return (
    <input className="filter-input" onChange={props.filtration} placeholder="Search"/>
  );
}

function AddNew(props) {
  return (
    <button className="add-button" onClick={props.openCloseModal}>+ ADD</button>
  );
}

function Pagination(props) {
  return (
    <span className="pagination">{props.pages.map( (item, i) =>
      <label key={i} className="page-number" onClick={ () => props.pagination(item)}>{item}</label>
    )}</span>
  );
}

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      date: '',
      days: '',
      mission: '',
      isMultiple: ''
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.clearInputs= this.clearInputs.bind(this);
  }

  clearInputs() {
    this.refs.name.value = '';
    this.refs.date.value = '';
    this.refs.days.value = '';
    this.refs.mission.value = '';
    this.refs.isMultiple.value = '';
  }

  onSubmit() {
    if ( this.refs.name.value !== '' ) {
      this.props.addItem(
        this.refs.name.value,
        this.refs.date.value,
        this.refs.days.value,
        this.refs.mission.value,
        this.refs.isMultiple.value
      );
      this.onClose();
    }
  }

  onClose() {
    this.clearInputs();
    this.props.openCloseModal();
  }

  render() {
    return (
      <div className = {this.props.isShowModal ? "modal" : "modal_hidden"}>
        <div className = "modal__background">
          <div className = "modal__window">
            <div className = "modal__header">
              <h2>New Astronaut</h2>
            </div>
            <div className="modal__section"><span>Name:</span><input className="modal__section_input" ref = 'name' /></div>
            <div className="modal__section"><span>Date:</span><input className="modal__section_input" ref = 'date' /></div>
            <div className="modal__section"><span>Days:</span><input className="modal__section_input" ref = 'days' /></div>
            <div className="modal__section"><span>Mission:</span><input className="modal__section_input" ref = 'mission' /></div>
            <div className="modal__section"><span>IsMultiple:</span><input className="modal__section_input" ref = 'isMultiple' /></div>
            <div className = "modal__footer">
              <button onClick={this.onSubmit}>Submit</button>
              <button onClick={this.onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class ListItems extends React.Component {
  render() {
    const { notes } = this.props;
    return (
      <div className="section section__table">
        <div className="table__header">
          <table className="table">
            <tbody>
              <tr>
                <th className = "table__header-cell">Id</th>
                <th className = "table__header-cell">Name</th>
                <th className = "table__header-cell">Date</th>
                <th className = "table__header-cell">Days</th>
                <th className = "table__header-cell">Mission</th>
                <th className = "table__header-cell">IsMultiple</th>
              </tr>
            </tbody>
          </table>
        </div>
        {notes.astro.map( item => <ListItem key={item.id} item = {item} removeItem = {this.props.removeItem} />)}
      </div>
    );
  }
}

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.removeClick = this.removeClick.bind(this);
  }

  removeClick() {
    this.props.removeItem(this.props.item.id);
  }

  render() {
    const item = this.props.item;

    return (
      <table className="table">
        <tbody>
          <tr>
            <td className = "table__cell">{item.id}</td>
            <td className = "table__cell">{item.name}</td>
            <td className = "table__cell">{item.date}</td>
            <td className = "table__cell">{item.days}</td>
            <td className = "table__cell">{item.mission}</td>
            <td className = "table__cell">{item.isMultiple}</td>
            <td onClick = {this.removeClick} className = "remove">x</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

AstronautsList.propTypes = {
  astro: React.PropTypes.array.isRequired,
  addAstronaut: React.PropTypes.func.isRequired,
  deleteAstronaut: React.PropTypes.func.isRequired,
};

export default AstronautsList;