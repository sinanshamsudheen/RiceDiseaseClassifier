import { useState, useEffect, useCallback } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Paper, CardActionArea, CardMedia, Grid, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, CircularProgress } from "@mui/material";
import cblogo from "./cblogo.PNG";
import backgroundImage from "./bg.png";
import { useDropzone } from 'react-dropzone';
import { common } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import axios from 'axios';

// Styled components
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(common.white),
  backgroundColor: common.white,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: '0px 4px 15px 0px rgba(190, 106, 119, 0.3)',
  },
  width: "-webkit-fill-available",
  borderRadius: "15px",
  padding: "15px 22px",
  color: "#000000a6",
  fontSize: "20px",
  fontWeight: 900,
  backdropFilter: 'blur(5px)',
  boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(255, 255, 255, 0.6)',
}));

const StyledAppBar = styled(AppBar)({
  background: '#be6a77',
  boxShadow: 'none',
  color: 'white'
});

const StyledCard = styled(Card)(({ image }) => ({
  margin: "auto",
  maxWidth: 400,
  height: image ? 500 : 'auto',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
  borderRadius: '15px',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0px 12px 80px 0px rgb(0 0 0 / 40%) !important',
  }
}));

const StyledCardMedia = styled(CardMedia)({
  height: 400,
});

const StyledTableContainer = styled(TableContainer)({
  backgroundColor: 'transparent !important',
  boxShadow: 'none !important',
});

const StyledTable = styled(Table)({
  backgroundColor: 'transparent !important',
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: 'transparent !important',
});

const StyledTableRow = styled(TableRow)({
  backgroundColor: 'transparent !important',
});

const LabelTableCell = styled(TableCell)({
  fontSize: '14px',
  backgroundColor: 'transparent !important',
  borderColor: 'transparent !important',
  color: '#000000a6 !important',
  fontWeight: 'bolder',
  padding: '1px 24px 1px 16px',
});

const DataTableCell = styled(TableCell)({
  fontSize: '22px',
  backgroundColor: 'transparent !important',
  borderColor: 'transparent !important',
  color: '#000000a6 !important',
  fontWeight: 'bolder',
  padding: '1px 24px 1px 16px',
});

const DetailCardContent = styled(CardContent)({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  borderTop: '1px solid rgba(190, 106, 119, 0.3)',
  backdropFilter: 'blur(10px)',
});

const StyledLoader = styled(CircularProgress)({
  color: '#be6a77 !important',
});

// Dropzone component
const DropzoneBox = styled(Box)({
  border: '2px dashed #aaa',
  borderRadius: '12px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(5px)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#be6a77',
  },
});

export const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  let confidence = 0;

  const sendFile = useCallback(async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      });
      if (res.status === 200) {
        setData(res.data);
      }
      setIsloading(false);
    }
  }, [image, selectedFile]);

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview, sendFile]);

  // Custom dropzone implementation using react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: (acceptedFiles) => {
      if (!acceptedFiles || acceptedFiles.length === 0) {
        setSelectedFile(undefined);
        setImage(false);
        setData(undefined);
        return;
      }
      setSelectedFile(acceptedFiles[0]);
      setData(undefined);
      setImage(true);
    }
  });

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  return (
    <React.Fragment>
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 0 }}>
            Rice Disease Classification
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* <Avatar src={cblogo} /> */}
        </Toolbar>
      </StyledAppBar>
      <Container 
        maxWidth={false} 
        disableGutters={true}
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          height: "93vh",
          marginTop: "8px",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.1)",
            zIndex: 0,
          }
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ padding: "4em 1em 0 1em" }}
        >
          <Grid item xs={12}>
            <StyledCard image={image}>
              {image && (
                <CardActionArea>
                  <StyledCardMedia
                    image={preview}
                    component="img"
                    title="Rice Plant Leaf"
                  />
                </CardActionArea>
              )}
              
              {!image && (
                <CardContent>
                  <DropzoneBox {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Typography variant="h6" sx={{ color: "#333", fontWeight: 600, mb: 2 }}>
                      Drag and drop an image of a rice plant leaf to process
                    </Typography>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <Typography variant="body1" sx={{ color: "#666" }}>
                        Or click to select a file
                      </Typography>
                      <Box
                        sx={{
                          border: '1px solid #be6a77',
                          borderRadius: '50%',
                          width: 60,
                          height: 60,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mt: 1,
                          backgroundColor: 'rgba(190, 106, 119, 0.1)'
                        }}
                      >
                        <Typography sx={{ fontSize: 30, color: '#be6a77' }}>+</Typography>
                      </Box>
                    </Box>
                  </DropzoneBox>
                </CardContent>
              )}
              
              {data && (
                <DetailCardContent>
                  <StyledTableContainer component={Paper}>
                    <StyledTable size="small" aria-label="simple table">
                      <StyledTableHead>
                        <StyledTableRow>
                          <LabelTableCell>Label:</LabelTableCell>
                          <LabelTableCell align="right">Confidence:</LabelTableCell>
                        </StyledTableRow>
                      </StyledTableHead>
                      <TableBody>
                        <StyledTableRow>
                          <DataTableCell component="th" scope="row">
                            {data.class}
                          </DataTableCell>
                          <DataTableCell align="right">{confidence}%</DataTableCell>
                        </StyledTableRow>
                      </TableBody>
                    </StyledTable>
                  </StyledTableContainer>
                </DetailCardContent>
              )}
              
              {isLoading && (
                <DetailCardContent>
                  <StyledLoader />
                  <Typography variant="h6" noWrap>
                    Processing
                  </Typography>
                </DetailCardContent>
              )}
            </StyledCard>
          </Grid>
          
          {data && (
            <Grid item sx={{ maxWidth: "416px", width: "100%" }}>
              <ColorButton 
                variant="contained" 
                color="primary" 
                component="span" 
                size="large" 
                onClick={clearData} 
                startIcon={<ClearIcon fontSize="large" />}
              >
                Clear
              </ColorButton>
            </Grid>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
};
