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

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

const CreateCoursePage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<{ tagsArr: string[] }>({ tagsArr: [] });
  const [tag, setTag] = useState('');
  const [sponsors, setSponsors] = useState<{ sponsArr: SponsorShortInfo[] }>({ sponsArr: [] });
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorDesc, setSponsorDesc] = useState('');

  return (
    <div className={styles.course_container}>
      <ThemeProvider theme={theme}>
        <div className={styles.main_info}>
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
            <div className={styles.add_container}>
              <p>Tags:</p>
              <div className={styles.existing_tags}>
                {tags.tagsArr.map(t => <Tag text={t}/>)}
              </div>
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
            </div>
            <div className={styles.add_container}>
              <p>Sponsors:</p>
              <div className={styles.existing_sponsors}>
                {sponsors.sponsArr.map(s => <SponsorCard name={s.name} description={s.description}/>)}
              </div>
              <div className={styles.sponsors_container}>
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
                      sponsArr: [...sponsors.sponsArr, {name: n, description: d}]
                    });
                    setSponsorName('');
                    setSponsorDesc('');
                  }}
                >
                  <AddIcon/>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.image_container}>
            <img src={lampImage} alt="lamp"/>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCoursePage);
