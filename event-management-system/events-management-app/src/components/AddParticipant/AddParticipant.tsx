import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { EventsContext } from "../EventsContext";
import type { TParticipant } from "../EventsContext/types";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/lt";

export const AddParticipant = () => {
  const { fetchedEvents } = useContext(EventsContext);
  const { token } = useContext(AuthContext);
  const [newParticipant, setNewParticipant] = useState<TParticipant>({
    fullName: null,
    eventName: null,
    email: null,
    age: null,
    dateOfBirth: null,
  });

  const resetForm = () => {
    setNewParticipant({
      fullName: null,
      eventName: null,
      email: null,
      age: null,
      dateOfBirth: null,
    });
  };

  const calculateAge = (dateOfBirth: string | null): number | null => {
    if (!dateOfBirth) return null;
    const today = dayjs();
    const dob = dayjs(dateOfBirth);
    const age = today.diff(dob, "year");
    return age;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    const value = event.target.value;
    const numericValue = isNaN(Number(value)) ? value : Number(value);
    setNewParticipant({ ...newParticipant, [prop]: numericValue });
  };

  const handleDateInputChange = (event: dayjs.Dayjs | null, prop: string) => {
    const dateOfBirth = event ? event.format("YYYY-MM-DD") : null;
    const age = calculateAge(dateOfBirth);
    setNewParticipant({
      ...newParticipant,
      [prop]: dateOfBirth,
      age: age,
    });
  };

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .post("http://localhost:8000/participants", newParticipant, {
        headers: headers,
      })
      .then(() => {
        alert(`Participant successfully added`);

        resetForm();
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  return (
    <>
      <Container>
        <Typography variant="h4" py={10}>
          Add participant
        </Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "50ch" },
          }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmitForm}
        >
          <TextField
            required
            label="Full name"
            value={newParticipant.fullName ?? ""}
            onChange={(event) => handleInputChange(event, "fullName")}
          />
          <TextField
            select
            required
            label="Event"
            value={newParticipant.eventName ?? ""}
            onChange={(event) =>
              setNewParticipant({
                ...newParticipant,
                eventName: event.target.value,
              })
            }
          >
            {fetchedEvents.map((event) => (
              <MenuItem key={event.eventId} value={event.eventName ?? ""}>
                {event.eventName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            label="Email"
            value={newParticipant.email ?? ""} // Double questionmark is used to provide a default value when the left-hand side of the operator evaluates to null or undefined.
            onChange={(event) => handleInputChange(event, "email")}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="lt">
            <DatePicker
              disableFuture
              label="Date of birth"
              value={
                newParticipant.dateOfBirth
                  ? dayjs(newParticipant.dateOfBirth)
                  : dayjs("1990-01-01")
              }
              onChange={(event) => handleDateInputChange(event, "dateOfBirth")}
            />
          </LocalizationProvider>
          <TextField
            disabled
            label="Age"
            type="number"
            value={newParticipant.age ?? ""}
          />
          <Button
            variant="outlined"
            color="inherit"
            type="submit"
            sx={{
              boxShadow: 1,
              borderRadius: 2,
              p: 1,
              maxWidth: 200,
            }}
          >
            Add participant
          </Button>
        </Box>
      </Container>
    </>
  );
};
