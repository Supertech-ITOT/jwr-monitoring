package com.company.jwr_monitoring.plc;

import lombok.RequiredArgsConstructor;
import org.apache.plc4x.java.api.PlcConnection;
import org.springframework.stereotype.Service;

import com.company.jwr_monitoring.dto.PlcReadResultDto;
import com.company.jwr_monitoring.entity.TagMaster;

@Service
@RequiredArgsConstructor
public class PlcReadService {
    private final PlcConnectionService plcConnectionService;

    public void testConnection() {
        try (
                PlcConnection connection = plcConnectionService.getConnection(
                        "192.168.1.10",
                        502)) {

            System.out.println("Connected = "
                    + connection.isConnected());

        } catch (Exception e) {

            e.printStackTrace();
        }
    }

    public PlcReadResultDto readTag(TagMaster tag) {

        return new PlcReadResultDto(
                tag.getId(),
                tag.getTagName(),
                0.0 // dummy value for now
        );
    }
}