import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/constants/EnvUrl";

const BlockEmbed = Quill.import("blots/block/embed");

class ImageBlot extends BlockEmbed {
  static create(value) {
    const imgTag = super.create();
    imgTag.setAttribute("src", value.src);
    imgTag.setAttribute("alt", value.alt);
    imgTag.setAttribute("width", "100%");
    return imgTag;
  }

  static value(node) {
    return { src: node.getAttribute("src"), alt: node.getAttribute("alt") };
  }
}

ImageBlot.blotName = "image";
ImageBlot.tagName = "img";
Quill.register(ImageBlot);

class VideoBlot extends BlockEmbed {
  static create(value) {
    if (value && value.src) {
      const videoTag = super.create();
      videoTag.setAttribute("src", value.src);
      videoTag.setAttribute("title", value.title);
      videoTag.setAttribute("width", "100%");
      videoTag.setAttribute("controls", "");

      return videoTag;
    } else {
      const iframeTag = document.createElement("iframe");
      iframeTag.setAttribute("src", value);
      iframeTag.setAttribute("frameborder", "0");
      iframeTag.setAttribute("allowfullscreen", true);
      iframeTag.setAttribute("width", "100%");
      return iframeTag;
    }
  }

  static value(node) {
    if (node.getAttribute("title")) {
      return { src: node.getAttribute("src"), alt: node.getAttribute("title") };
    } else {
      return node.getAttribute("src");
    }
  }
}

VideoBlot.blotName = "video";
VideoBlot.tagName = "video";
Quill.register(VideoBlot);

class QuillEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorHtml: this.props.content || "",
    };

    this.reactQuillRef = null;

    this.inputOpenImageRef = React.createRef();
    this.inputOpenVideoRef = React.createRef();
    this.inputOpenFileRef = React.createRef();
  }

  handleChange = (html) => {
    console.log("html", html);

    this.setState(
      {
        editorHtml: html,
      },
      () => {
        this.props.setContent(this.state.editorHtml);
      }
    );
  };

  imageHandler = () => {
    this.inputOpenImageRef.current.click();
  };

  videoHandler = () => {
    this.inputOpenVideoRef.current.click();
  };

  insertImage = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const file = e.currentTarget.files[0];

      let formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      formData.append("file", file);

      this.props.setClientModal("loader");
      axios
        .post(
          process.env.NODE_ENV !== "production"
            ? "/api/fileUpload"
            : baseUrl + "/api/fileUpload",
          formData,
          config
        )
        .then((response) => {
          this.props.setClientModal("");
          toast.success(
            "The image has been uploaded succesfully! Fetching the image."
          );

          const quill = this.reactQuillRef.getEditor();
          quill.focus();

          let range = quill.getSelection();
          let position = range ? range.index : 0;

          quill.insertEmbed(position, "image", {
            src: response.data.data.image,
            alt: "image",
          });
          quill.setSelection(position + 1);
        })
        .catch((error) => {
          this.props.setClientModal("");

          if (error.response.status === 401) this.props.setIsLoggedIn(false);
          else
            toast.error(
              error.response?.data?.msg || JSON.stringify(error.response?.data)
            );
        });
    }
  };

  insertVideo = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const file = e.currentTarget.files[0];

      let formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      formData.append("file", file);

      this.props.setClientModal("loader");
      axios
        .post(
          process.env.NODE_ENV !== "production"
            ? "/api/fileUpload"
            : baseUrl + "/api/fileUpload",
          formData,
          config
        )
        .then((response) => {
          this.props.setClientModal("");
          toast.success(
            "The video has been uploaded succesfully! Fetching the video."
          );

          const quill = this.reactQuillRef.getEditor();
          quill.focus();

          let range = quill.getSelection();
          let position = range ? range.index : 0;
          quill.insertEmbed(position, "video", {
            src: response.data.data.image,
            alt: "video",
          });
          quill.setSelection(position + 1);
        })
        .catch((error) => {
          this.props.setClientModal("");

          if (error.response.status === 401) this.props.setIsLoggedIn(false);
          else
            toast.error(
              error.response?.data?.msg || JSON.stringify(error.response?.data)
            );
        });
    }
  };

  render() {
    return (
      <div>
        <div id="toolbar">
          <select
            className="ql-header"
            defaultValue=""
            onChange={(e) => e.persist()}
          >
            <option value="1" />
            <option value="2" />
            <option value="3" />
            <option value="4" />
            <option value="" />
          </select>
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
          <button className="ql-insertImage">I</button>
          <button className="ql-insertVideo">V</button>
          <button className="ql-link" />
          <button className="ql-video" />
          <button className="ql-blockquote" />
          <select
            className="ql-color"
            defaultValue=""
            onChange={(e) => e.persist()}
          >
            {colors.map((v) => {
              return <option key={v} value={v} />;
            })}
          </select>
          <select
            className="ql-background"
            defaultValue=""
            onChange={(e) => e.persist()}
          >
            {colors.map((v) => {
              return <option key={v} value={v} />;
            })}
          </select>
          <select
            className="ql-align"
            defaultValue=""
            onChange={(e) => e.persist()}
          >
            <option value="" />
            <option value="justify" />
            <option value="right" />
            <option value="center" />
          </select>
        </div>
        <ReactQuill
          ref={(el) => {
            this.reactQuillRef = el;
          }}
          theme="snow"
          onChange={this.handleChange}
          modules={this.modules}
          formats={this.formats}
          value={this.state.editorHtml}
          placeholder={this.props.placeholder}
        />
        <input
          type="file"
          accept="image/*"
          ref={this.inputOpenImageRef}
          style={{ display: "none" }}
          onChange={this.insertImage}
        />
        <input
          type="file"
          accept="video/*"
          ref={this.inputOpenVideoRef}
          style={{ display: "none" }}
          onChange={this.insertVideo}
        />
      </div>
    );
  }

  modules = {
    syntax: true,
    toolbar: {
      container: "#toolbar",
      handlers: {
        insertImage: this.imageHandler,
        insertVideo: this.videoHandler,
      },
    },
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "image",
    "video",
    "link",
    "video",
    "blockquote",
    "color",
    "background",
    "align",
    "clean",
  ];
}

const colors = [
  "",
  "#000000",
  "#e60000",
  "#ff9900",
  "#ffff00",
  "#008a00",
  "#0066cc",
  "#9933ff",
  "#ffffff",
  "#facccc",
  "#ffebcc",
  "#ffffcc",
  "#cce8cc",
  "#cce0f5",
  "#ebd6ff",
  "#bbbbbb",
  "#f06666",
  "#ffc266",
  "#ffff66",
  "#66b966",
  "#66a3e0",
  "#c285ff",
  "#888888",
  "#a10000",
  "#b26b00",
  "#b2b200",
  "#006100",
  "#0047b2",
  "#6b24b2",
  "#444444",
  "#5c0000",
  "#663d00",
  "#666600",
  "#003700",
  "#002966",
  "#3d1466",
];

export default QuillEditor;
