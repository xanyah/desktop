import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
import OrdersPage from '../../components/orders-page'
import { getOrders, searchApiOrder, updateOrderField } from '../../actions'

const mapStateToProps = ({ orders: { loading, orders } }) => ({
  loading,
  orders,
})

const mapDispatchToProps = dispatch => ({
  getOrders: () => dispatch(getOrders()),
  openOrder: order => {
    dispatch(updateOrderField('selectedOrder', order))
    // dispatch(push(`/orders/${order.id}`))
  },
  searchApiOrder: query => dispatch(searchApiOrder(query)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage)
