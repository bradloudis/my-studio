import React, { Component } from 'react';
import { connect } from 'react-redux';

// import s3 image uploader
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

const dropStyles = {
  width: '50px',
  height: '20px',
  display: 'flex',
  'justify-content': 'center',
  'align-items': 'center',
};

const innerDropElement = (
  <div className="img-upload-text">
    <p>Edit</p>
  </div>
);

class ImageUpload extends Component {
  handleFinishedUpload = (info) => {
    // console.log('File upload with filename', info.filename);
    // console.log('Access it on s3 at', info.fileUrl);

    // sending fileUrl (string) to be saved in User table
    this.props.dispatch({
      type: 'SET_IMAGE_URL',
      payload: { link: info.fileUrl },
    });
  };

  render() {
    const uploadOptions = {
      server: 'http://localhost:5000',
      // signingUrlQueryParams: {uploadType: 'avatar'},
    };

    const s3Url = 'https://my-studio.s3.amazonaws.com';

    return (
      <DropzoneS3Uploader
        onFinish={this.handleFinishedUpload}
        s3Url={s3Url}
        maxSize={1024 * 1024 * 5}
        upload={uploadOptions}
        children={innerDropElement}
        style={dropStyles}
      />
    );
  }
}

export default connect()(ImageUpload);
