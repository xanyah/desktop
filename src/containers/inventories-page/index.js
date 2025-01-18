import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
import InventoriesPage from '../../components/inventories-page'
import { getInventories, updateInventoriesField } from '../../actions'

const mapStateToProps = ({ inventories: { inventories, loading } }) => ({
  inventories,
  loading,
})

const mapDispatchToProps = dispatch => ({
  getInventories: () => dispatch(getInventories()),
  openInventory: inventory => {
    dispatch(updateInventoriesField('selectedInventory', inventory))
    // dispatch(push(`/inventories/${inventory.id}`))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(InventoriesPage)
