import React, { useState } from 'react';
import lampImage from '@assets/course-create.gif';
import styles from './styles.module.sass';
import { connect } from 'react-redux';
import { createMuiTheme, TextField } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import Tag from '@components/Tag';
import AddIcon from '@material-ui/icons/Add';
import { SponsorShortInfo } from '@models/sponsorData';
import SponsorCard from '@components/SponsorCard';
import GradientButton from '@components/GradientButton';
import { createCourseRoutine } from '@routines/courseRoutines';
import { CourseCreateData } from '@models/courseData';
import { history } from '@helpers/history.helper';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

interface ICreateCoursePageProps {
  addCourse: (data: CourseCreateData) => any;
}

const CreateCoursePage: React.FC<ICreateCoursePageProps> = ({ addCourse }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<{ tagsArr: string[] }>({ tagsArr: [] });
  const [tag, setTag] = useState('');
  const [sponsors, setSponsors] = useState<{ sponsArr: SponsorShortInfo[] }>({ sponsArr: [] });
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorDesc, setSponsorDesc] = useState('');

  const handleSubmit = () => {
    if (!name)
      return;

    addCourse({
      name,
      description,
      tags: tags.tagsArr,
      sponsors: sponsors.sponsArr
    });

    history.push('/');
  };

  return (
    <div className={styles.course_container}>
      <ThemeProvider theme={theme}>
        <div className={styles.main_info}>
          <div className={styles.image_container}>
            <img src={lampImage} alt="lamp"/>
          </div>
          <div className={styles.input_container}>
            <TextField
              label="Name"
              value={name}
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{
                className: styles.input
              }}
            />
            <TextField
              label="Description"
              value={description}
              multiline
              rows={5}
              variant="outlined"
              onChange={(e) => setDescription(e.target.value)}
              InputLabelProps={{
                className: styles.input
              }}
            />
            <GradientButton text="Create Course" onClick={() => handleSubmit()}/>
          </div>
        </div>
        <div className={styles.additional_info}>
          <div className={styles.tags_container}>
            <p>Tags:</p>
            <TextField
              label="Your tag"
              value={tag}
              variant="outlined"
              onChange={(e) => setTag(e.target.value)}
              InputLabelProps={{
                className: styles.input
              }}
            />
            <button
              className={styles.add_tag_button}
              onClick={() => {
                const t = tag.trim();
                if (!t) {
                  return;
                }
                setTags({
                  tagsArr: [...tags.tagsArr, t]
                });
                setTag('');
              }}
            >
              <AddIcon/>
            </button>
            <div className={styles.existing_tags}>
              {tags.tagsArr.map(t => <Tag text={t}/>)}
            </div>
          </div>
          <div className={styles.sponsors_container}>
            <p>Sponsors:</p>
            <div className={styles.sponsors_list_container}>
              <div>
                <TextField
                  label="Name"
                  value={sponsorName}
                  variant="outlined"
                  onChange={(e) => setSponsorName(e.target.value)}
                  InputLabelProps={{
                    className: styles.input
                  }}
                />
                <TextField
                  label="Description"
                  value={sponsorDesc}
                  multiline
                  rows={5}
                  variant="outlined"
                  onChange={(e) => setSponsorDesc(e.target.value)}
                  InputLabelProps={{
                    className: styles.input
                  }}
                />
              </div>
              <button
                className={styles.add_tag_button}
                onClick={() => {
                  const n = sponsorName.trim();
                  const d = sponsorDesc.trim();
                  if (!n) {
                    return;
                  }
                  setSponsors({
                    sponsArr: [...sponsors.sponsArr, {
                      name: n,
                      description: d
                    }]
                  });
                  setSponsorName('');
                  setSponsorDesc('');
                }}
              >
                <AddIcon/>
              </button>
            </div>
          </div>
          <div className={styles.existing_sponsors}>
            {sponsors.sponsArr.map(s => <SponsorCard name={s.name} description={s.description}/>)}
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

const mapDispatchToProps = {
  addCourse: createCourseRoutine
};

export default connect(null, mapDispatchToProps)(CreateCoursePage);
