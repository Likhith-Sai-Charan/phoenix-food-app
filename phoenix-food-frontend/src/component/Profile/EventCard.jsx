import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const EventCard = () => {
  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{ height: 345 }}
          image="https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?_gl=1*ac2m8l*_ga*MzkzNDg5NTUxLjE3NTIzMTgxODU.*_ga_8JE65Q40S6*czE3NTM1NDUzMjEkbzckZzEkdDE3NTM1NDUzMzgkajQzJGwwJGgw"
        />
        <CardContent>
          <Typography variant="h5">Atlantis</Typography>
          <Typography variant="body2">50% off on your first order</Typography>
          <div className="py-2 space-y-2">
            <p>{"mumbai"}</p>
            <p className="text-sm text-blue-500">August 15, 2025 12:00AM</p>
            <p className="text-sm text-red-500">August 16, 2025 12:00AM</p>
          </div>
        </CardContent>

        {false && <CardActions>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </CardActions>}
      </Card>
    </div>
  );
};

export default EventCard;
