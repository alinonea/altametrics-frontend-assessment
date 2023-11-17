import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function InvoiceModal(props:any) {

    console.log(props)
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
      >
        <Box sx={style}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Amount
            </Typography>
            <Typography sx={{ fontSize: 14 }} gutterBottom style={{color: 'black'}}>
            {
                props.invoice ? props.invoice['amount'] : ''
            }
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" >
            Due date
            </Typography>
            <Typography sx={{ fontSize: 14 }} gutterBottom style={{color: 'black'}}>
            {
                props.invoice ? new Date(props.invoice['due_date']).toDateString() : ""
            }
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" >
            Details
            </Typography>
            <Typography sx={{ fontSize: 14 }} style={{color: 'black'}}>
            {
            props.invoice ? props.invoice['details'] : ""
            }
            </Typography>

        </Box>
      </Modal>
    </div>
  );
}